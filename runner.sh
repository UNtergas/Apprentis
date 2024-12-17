#!/bin/bash
 #############################################################################
 ## runner script for running development, production, test environment     ##
 ## by Anh Tuan                                                             ##
 #############################################################################

# Project location
DIR="$(pwd)"
export DIR

# DOCKER COMPOSE FILE
DOCKER_COMPOSE_DEV="${DIR}/infrastructure/docker-compose.dev.yaml"

# DOCKER USER
export DOCKER_UID="$UID"
export DOCKER_GID="$GID"


cd "${DIR}" || exit


if [ "$EUID" -eq 0 ]; then
  echo "Error: Do not run this script as root or with sudo."
  echo "Please run the script as a normal user with the necessary permissions."
  exit 1
fi


display_help() {
  echo "Usage: ./runner.sh [COMMAND]"
  echo ""
  echo " Runner script  to run application in the dev, prod or test environment"
  echo ""
  echo "Commands:"
  echo "  help                 Display this help message and exit"
  echo "  dev                  Run the application in the local development environment"
  echo "  prod                 Build and run the application in production mode with Nginx serving the frontend"
  echo "  clean                Remove build artifacts, node_modules, docker-volume and clean the environment"
  echo ""
  echo "Options:"
  echo "  -h, --help           Display this help message"
  echo ""
  echo "Examples:"
  echo "  ./runner.sh dev         Rebuild the app and start the app in development mode"
  echo "  ./runner.sh up          Start the existing container app in development mode"
  echo "  ./runner.sh clean       Remove all build artifacts and node_modules to clean the environment"
  echo ""
  echo "Important Notes"
  echo "- Don't run  with 'sudo'"
}

clean_app(){
  read -r -p "Data on dev database will be lost. Proceed? (y/n): " proceed
    if [[ "$proceed" =~ ^[yY]$ ]]; then
      docker compose -f "${DOCKER_COMPOSE_DEV}" down -t 1 --volumes
      sudo rm -rf node_modules packages/*/node_modules packages/*/dist
      sudo rm -rf pnpm-lock.yaml .pnpm-store
      sudo docker volume remove postgres_data
      echo "Project is deep cleaned !"
    fi
}


clean_dev(){
  mkdir -p node_modules
  docker image prune
  docker compose -f "${DOCKER_COMPOSE_DEV}" build --no-cache
  docker compose -f "${DOCKER_COMPOSE_DEV}" up --remove-orphans -d
  docker compose -f "${DOCKER_COMPOSE_DEV}" logs -f backend -f frontend -f nginx -f db
  docker compose -f "${DOCKER_COMPOSE_DEV}" down -t 1
}

up_dev(){
  docker compose -f "${DOCKER_COMPOSE_DEV}" up --remove-orphans -d
  docker compose -f "${DOCKER_COMPOSE_DEV}" logs -f backend -f frontend -f nginx -f db
  docker compose -f "${DOCKER_COMPOSE_DEV}" down -t 1
}


if [[ "$1" = "help" || "$1" = "--help" || "$1" = "-h" ]]; then
  display_help
  exit 0


elif [[ "$1" = "clean" ]]; then
  clean_app
  exit 0

elif [[ "$1" = "dev" ]]; then
  clean_dev
  exit 0

elif [[ "$1" = "up" ]]; then
  up_dev
  exit 0

else
    echo 'Use --help to see available options'
fi

