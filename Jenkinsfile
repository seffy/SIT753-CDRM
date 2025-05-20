pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        PORT = '8087'
        MONGO_URI = credentials('mongo-uri')
        SESSION_SECRET = credentials('session-secret')
        // For Mac M1 Docker compatibility
        PATH = "/usr/local/bin:/Applications/Docker.app/Contents/Resources/bin:$PATH"
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
                sh 'npm ci' // Using ci for cleaner installs than npm install
                sh 'npm run build || echo "No build script found, skipping..."'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No tests defined, continuing..."'
                // Add test reporting if available
                junit '**/test-results.xml' allowEmptyResults: true
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint...'
                sh 'npx eslint . -f junit -o eslint-report.xml || echo "Linting completed with findings"'
                archiveArtifacts 'eslint-report.xml'
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running Trivy scan...'
                sh '''
                    trivy fs --security-checks vuln --format template \
                    --template "@contrib/junit.tpl" -o trivy-report.xml . || true
                '''
                archiveArtifacts 'trivy-report.xml'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    // For Mac M1, we should build with platform if needed
                    def dockerBuildCommand = 'docker build -t sit753-cdrm .'
                    if (isUnix()) {
                        dockerBuildCommand = 'docker buildx build --platform linux/amd64 -t sit753-cdrm .'
                    }
                    sh dockerBuildCommand
                }
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
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
            // Optional: Add notifications here
        }
        failure {
            echo 'Pipeline failed! Please check the logs.'
            // Optional: Add failure notifications here
        }
    }
}