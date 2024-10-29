NAME=Quorum

build-docker:
	docker build -t ${NAME} -f docker/Dockerfile .
