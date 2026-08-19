# Safety Workspace — Phishing Awareness & Detection Platform

Safety Workspace is a full-stack cybersecurity learning platform that helps users recognise phishing attempts before they click. It combines guided learning modules, scenario-based quizzes, a URL risk scanner, progress tracking, and an optional local AI assistant.

> **Important:** URL scores are educational risk indicators, not a guarantee that a link is safe or malicious. Always verify unexpected requests through an official channel.

## What it does

- **Teaches phishing awareness:** 20 topic collections with slide-based lessons, including email phishing, smishing, vishing, social media scams, malware delivery, and more.
- **Tests knowledge:** Each lesson can include a ten-question quiz, with attempts saved to the signed-in user profile.
- **Scans suspicious URLs:** The detector evaluates static URL signals such as HTTPS use, suspicious words and TLDs, IP-address hosts, punycode, URL structure, subdomains, and encoded characters.
- **Uses ML when trained artifacts exist:** A Decision Tree, Random Forest, and Extra Trees ensemble can return phishing-risk scores. The API uses a conservative static-feature fallback until model artifacts are trained.
- **Adds optional live intelligence:** Google Safe Browsing, VirusTotal, RDAP domain age, and DNS resolution can enrich a scan when the relevant API keys are configured.
- **Keeps feedback controlled:** Only high-confidence reputation evidence is queued for later batch retraining; user guesses never directly retrain the model.
- **Provides a local chatbot:** The simulator chatbot calls a locally running Ollama model through the Flask backend, so no third-party LLM key is exposed in the browser.
- **Supports administration:** Admins can view users and quiz attempts, manage user accounts, and export progress reports.

## Technology stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, React Router, Lucide icons |
| Backend | Python, Flask, Flask-PyMongo, Marshmallow |
| Authentication | JWT and bcrypt password hashing |
| Database | MongoDB / MongoDB Atlas |
| Detection | scikit-learn, pandas, joblib |
| Learning content | PDF.js (`pdfjs-dist`) rendered lesson slides |
| Local AI (optional) | Ollama via its local chat API |

## Project structure

```text
.
├── frontend/                 # React/Vite application
│   ├── src/pages/            # Learning, detector, simulator, auth views
│   ├── src/components/       # Navbar, quiz, user panel, admin panel
│   ├── src/data/             # Topics and phishing quiz data
│   └── public/slides/        # Lesson PDFs
└── backend/                  # Flask API and ML utilities
    ├── main.py               # API, authentication, user and quiz routes
    ├── detector.py           # URL features, scoring, model inference
    ├── reputation.py         # Optional live-reputation integrations
    ├── ollama_review.py      # Local Ollama chatbot and review helpers
    ├── train_unified_url_model.py
    └── retrain_verified_feedback.py
```

## Local setup

### 1. Configure the backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Update `backend/.env` with your own values:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
MONGO_DBNAME=safety_workspace
SECRET_KEY=<a-long-random-secret>

# Optional reputation sources
ENABLE_REPUTATION_CHECKS=true
GOOGLE_SAFE_BROWSING_API_KEY=<your-key>
VIRUSTOTAL_API_KEY=<your-key>

# Optional local Ollama assistant
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen2.5-coder:14b
OLLAMA_CHAT_MODEL=qwen2.5-coder:14b
OLLAMA_TIMEOUT_SECONDS=90
```

Never commit `.env`, API keys, database credentials, or JWT secrets.

### 2. Start the backend

```powershell
cd backend
python main.py
```

The Flask API starts on `http://127.0.0.1:5000`.

### 3. Start the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173` and proxies `/api/*` requests to Flask during development.

### 4. Optional: run the local AI assistant

Install Ollama, then ensure the configured model is available:

```powershell
ollama pull qwen2.5-coder:14b
ollama serve
```

For a smaller machine, set `OLLAMA_CHAT_MODEL` to a lighter downloaded model. If Ollama is unavailable, the rest of the platform continues to work; only chatbot replies and optional local AI reviews are unavailable.

## URL detector workflow

1. The frontend submits a URL to `POST /detect` without opening it.
2. Flask normalises the URL and extracts static phishing indicators.
3. Trained model artifacts are used when available; otherwise, a conservative fallback score is returned.
4. Optional reputation providers add external verdicts and domain intelligence.
5. A known malicious reputation result can raise the risk score and queue verified evidence for controlled retraining.

The detector intentionally does **not** crawl or open the submitted URL.

## API overview

| Endpoint | Purpose |
| --- | --- |
| `POST /signup`, `POST /login` | Account registration and JWT login |
| `POST /detect` | Analyse URL patterns, models, and optional reputation data |
| `POST /detect/feedback` | Store authenticated user feedback for review |
| `POST /save_quiz_attempt` | Save a signed-in user's quiz attempt |
| `GET /user_progress` | Get the signed-in user's progress |
| `POST /chatbot` | Send simulator chat history to local Ollama |
| `GET /admin/users`, `GET /admin/quiz_attempts` | Admin reporting data |

## Training and controlled retraining

The training scripts are deliberately separate from the web runtime:

```powershell
cd backend
python train_unified_url_model.py <path-to-malicious_phish.csv>
python retrain_verified_feedback.py --min-feedback 100
```

Training creates artifacts under `backend/model_artifacts/`. Do not treat user-submitted labels as ground truth; review feedback before allowing it into retraining.

## Deployment notes

- Deploy the React frontend as a static site and Flask as a web service.
- Set `VITE_API_URL` to your deployed backend URL if the frontend and API use different domains.
- Store all backend environment variables in the host's secret manager.
- Ensure CORS permits only the deployed frontend domain.
- Ollama requires a machine that can run the chosen model. For most cloud deployments, use a dedicated Ollama/GPU service or a hosted LLM provider instead of placing a large local model on a small web-service instance.

## Future improvements

- Add automated API and UI tests.
- Add rate limiting to authentication, URL scans, and chatbot requests.
- Add request logging and observability without storing sensitive URLs unnecessarily.
- Add model evaluation metrics and dataset provenance to the repository.
- Use a production WSGI server such as Gunicorn for Linux deployment.

## License

Add a license file before making the repository public.
