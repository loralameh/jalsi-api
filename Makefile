dev_arch := $(shell uname -p)
include .env

VARS:=$(shell sed -ne 's/ *\#.*$$//; /./ s/=.*$$// p' .env )
$(foreach v,$(VARS),$(eval $(shell echo export $(v)="$($(v))")))

export UID=$(shell id -u)
export GID=$(shell id -g)


clean:
	docker compose down
	rm -rf mongo

install:
	docker run --rm -v "$(PWD):/app/" -w /app $${IMAGE_NAME:-staticapi}:$${IMAGE_VER:-20} yarn install --network-timeout=5000000
upgrade:
	docker run -it --rm -v "$(PWD):/app/" -w /app $${IMAGE_NAME:-staticapi}:$${IMAGE_VER:-20} yarn upgrade --network-timeout=5000000

bash:
	docker run -it --rm -v "$(PWD):/app/" -w /app $${IMAGE_NAME:-staticapi}:$${IMAGE_VER:-20} bash

bash2:
	docker run -it --rm -v "$(PWD):/app/" -w /app node:20 bash
add:
	docker run --rm -v "$(PWD):/app/" -w /app $${IMAGE_NAME:-staticapi}:$${IMAGE_VER:-20} yarn add $(pkg) --network-timeout=5000000
remove:
	docker run -it --rm -v "$(PWD):/app/" -w /app $${IMAGE_NAME:-staticapi}:$${IMAGE_VER:-20} yarn remove $(pkg) --network-timeout=5000000


restart:
	docker compose down
	docker compose --env-file .env up -d
stop:
	docker compose down

start:
	sed -i "s/NEXT_PUBLIC_GIT_COMMIT.*/NEXT_PUBLIC_GIT_COMMIT=$$(git rev-parse --short HEAD)/g" .env
	docker compose down
	docker compose --env-file .env up -d


dev:
	# make remove-container
	docker compose down
	docker compose --env-file .env up
