pm2-start:
	yarn build && pm2 start ecosystem.config.js --env production

pm2-restart:
	pm2 restart ecosystem.config.js --env production

docker-build-release: 
	docker build --platform linux/amd64  -t tridentity-tcr.tencentcloudcr.com/develop/tridentity-consumer-fe:${tag} --build-arg REACT_APP_BASE_URL="https://api.tribox.me/api/" .

docker-push-release:
	docker push tridentity-tcr.tencentcloudcr.com/develop/tridentity-consumer-fe:${tag}

helm-install:
	helm install tridentity-consumer-fe ./tridentity-consumer-fe-charts --set deployment.image.tag=${tag}
helm-uninstall:
	helm uninstall tridentity-consumer-fe