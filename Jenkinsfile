pipeline {
    agent any
    environment {
        VENV_PATH = 'flask_venv'
        APP_DIR = '/home/tcon/tattoodustin'  // Update to your deployment path
        SERVER_USER = 'tcon'  // Deployment server user
        SERVER_IP = '192.168.0.224'  // Deployment server IP
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/tconn93/FreddyBooking.git', branch: 'main'
            }
        }
        stage('Setup Virtual Environment') {
            steps {
                sh 'python3 -m venv ${VENV_PATH}'
                sh 'source ${VENV_PATH}/bin/activate'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'source ${VENV_PATH}/bin/activate && pip install -r requirements.txt'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'source ${VENV_PATH}/bin/activate && pytest tests/'  // Assuming pytest; adjust if needed
            }
        }
        stage('Deploy to Nginx Server') {
            steps {
                sshagent(credentials: ['your-ssh-credential-id']) {  // Credential ID from Jenkins
                    sh """
                    ssh ${SERVER_USER}@${SERVER_IP} 'cd ${APP_DIR} && git pull origin main && source venv/bin/activate && pip install -r requirements.txt && sudo systemctl restart myflaskapp'
                    """
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up workspace'
            deleteDir()  // Or sh 'rm -rf ${VENV_PATH}'
        }
        success {
            echo 'Pipeline succeeded! Flask app deployed.'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
