# Variables
COMPOSE_FILE = docker-compose.dev.yaml

help:
	@echo "Available commands:"
	@echo "  make up       - Start the services defined in $(COMPOSE_FILE)"
	@echo "  make down     - Stop the services"
	@echo "  make down_vol - Stop the services and remove the volumes"
	@echo "  make build    - Build or rebuild the services"
	@echo "  make start  -  Start the services"
	@echo "  make restart  - Restart the services"
	@echo "  make clean    - Stop the services, remove the volumes,node_module,pnpm store, and clean the project"
	@echo "  make logs     - Show logs for the services"
	@echo "  make ps       - List the running containers"
	@echo "  make run COMMAND=<command> - Run any custom docker-compose command (e.g., make run COMMAND='exec app bash')"
	@echo "  make run_backend COMMAND=<command> - Run any custom command in the backend container (e.g., make run_backend COMMAND='npx prisma migrate dev')"
up:
	@docker compose -f $(COMPOSE_FILE) up

down:
	@docker compose -f $(COMPOSE_FILE) down

down_vol:
	@docker compose -f $(COMPOSE_FILE) down -v

build:
	@docker image prune
	@docker compose -f $(COMPOSE_FILE) build

start:
	@docker image prune
	@docker compose -f $(COMPOSE_FILE) build
	@docker compose -f $(COMPOSE_FILE) up

restart:
	@docker compose -f $(COMPOSE_FILE) down
	@docker compose -f $(COMPOSE_FILE) up

logs:
	@docker compose -f $(COMPOSE_FILE) logs -f

ps:
	@docker compose -f $(COMPOSE_FILE) ps
run:
	@if [ -z "$(COMMAND)" ]; then \
		echo "Error: No command provided. Usage: make run COMMAND='<command>'"; \
		exit 1; \
	else \
		docker compose -f $(COMPOSE_FILE) $(COMMAND); \
	fi

run_backend:
	@if [ -z "$(COMMAND)" ]; then \
		echo "Error: No command provided. Usage: make run COMMAND='<command>'"; \
		exit 1; \
	else \
		docker compose -f $(COMPOSE_FILE) run --rm backend sh -c "$(COMMAND)"; \
	fi

clean:
	@docker compose -f $(COMPOSE_FILE) down -t 1 --volumes
	@sudo rm -rf ../node_modules ../packages/*/node_modules packages/*/dist
	@sudo rm -rf ../pnpm-lock.yaml ../.pnpm-store
	@sudo docker volume remove postgres_data
	@echo "Project cleaned"
