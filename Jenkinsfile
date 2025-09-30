@Library('shared') _

pipeline {
    agent any
    environment {
        SONAR_HOME = tool "sonar"
    }

    parameters {
        string(name: 'FRONTEND_DOCKER_TAG', defaultValue: '', description: 'Setting latest image for docker push')
        string(name: 'BACKEND_DOCKER_TAG', defaultValue: '', description: 'Setting latest image for docker push')
    }

    stages {
        stage('Validate parameter') {
            steps {
                script {
                    if (params.FRONTEND_DOCKER_TAG == '' || params.BACKEND_DOCKER_TAG == '') {
                        error("Please provide tags for docker images in the parameter")
                    }
                }
            }
        }

        stage('Workspace Clean-up') {
            steps {
                script {
                    cleanWs() // Jenkins in-built function to clean workspace
                }
            }
        }

        stage('Git: check out') {
            steps {
                script {
                    gitcheckout("https://github.com/surendraaaaa/jenkins-k8s-3tier.git", "main")
                }
            }
        }

        stage('Trivy FS Scan') {
            steps {
                script {
                    trivy_fs_scan()
                }
            }
        }

        stage('OWASP dependency check') {
            steps {
                script {
                    OWASP_dependency_check()
                }
            }
        }

        stage('Sonar: code analysis') {
            steps {
                script {
                    sonar_analysis('sonar', 'demo', 'demo')
                }
            }
        }

        stage('Sonar: Quality gates') {
            steps {
                script {
                    sonar_quality_gate()
                }
            }
        }

        stage('Updating Environment Variables') {
            steps {
                script {
                    dir("automations") {
                        sh "bash updateenv.sh"
                    }
                }
            }
        }

        stage('Docker build') {
            steps {
                script {
                    dir("client") {
                        docker_build("Jenkins-k8s-3tier-frontend", "${params.FRONTEND_DOCKER_TAG}", "surendraprajapati")
                    }
                    dir("server") {
                        docker_build("Jenkins-k8s-3tier-backend", "${params.BACKEND_DOCKER_TAG}", "surendraprajapati")
                    }
                }
            }
        }

        stage('Docker push') {
            steps {
                script {
                    docker_push("Jenkins-k8s-3tier-frontend", "${params.FRONTEND_DOCKER_TAG}", "surendraprajapati")
                    docker_push("Jenkins-k8s-3tier-backend", "${params.BACKEND_DOCKER_TAG}", "surendraprajapati")
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: '*.xml', followSymlinks: false
            build job: "3tier-CD", parameters: [
                string(name: 'FRONTEND_DOCKER_TAG', value: "${params.FRONTEND_DOCKER_TAG}"),
                string(name: 'BACKEND_DOCKER_TAG', value: "${params.BACKEND_DOCKER_TAG}")
            ]
        }
    }
}
