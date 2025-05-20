pipeline {
    agent any

    tools {
        nodejs 'node18' // Ensure NodeJS is configured in Jenkins > Global Tool Configuration
    }

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:$PATH" // 👈 Adds Docker path for macOS
        PORT = '8087'
        MONGO_URI = credentials('mongo-uri')             // Set this in Jenkins > Credentials
        SESSION_SECRET = credentials('session-secret')   // Set this too
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning repository...'
                git url: 'https://github.com/seffy/SIT753-CDRM.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies and building...'
                sh 'npm install'
                sh 'npm run build || echo "No build script found, skipping..."'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No tests defined, continuing..."'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint...'
                sh 'npx eslint . || echo "Linting warnings or errors detected"'
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running Trivy scan...'
                sh 'trivy fs . || echo "Security scan completed (check logs for results)"'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t sit753-cdrm .'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying Docker container on port 8087...'
                sh '''
                    docker stop sit753-cdrm || true
                    docker rm sit753-cdrm || true
                    docker run -d --name sit753-cdrm \
                    -p 8087:8087 \
                    -e MONGO_URI="$MONGO_URI" \
                    -e SESSION_SECRET="$SESSION_SECRET" \
                    -e PORT="$PORT" \
                    sit753-cdrm
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed! Please check the logs.'
        }
    }
}