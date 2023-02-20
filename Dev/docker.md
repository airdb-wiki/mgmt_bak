## Container

Suggest to use podman

Apple Silcon:

brew install simnalamburt/x/podman-apple-silicon
podman machine init --cpus=2 --disk-size=20 --memory 1000

Refer: https://edofic.com/posts/2021-09-12-podman-m1-amd64/

Error: short-name resolution enforced but cannot prompt without a TTYr
podman machine ssh

sed -i 's/short-name-mode="enforcing"/short-name-mode="permissive"/g' /etc/containers/registries.conf
unqualified-search-registries = ["docker.io", "registry.fedoraproject.org", "registry.access.redhat.com", "quay.io"]


## Docker
$docker exec -it -e COLUMNS=$(tput cols) -e LINES=$(tput lines) airdb/go bash

$ docker save myimage:latest | gzip > myimage_latest.tar.gz
$ docker save -o fedora-all.tar fedora

$ docker import /path/to/exampleimage.tgz
$	sudo tar -c . | docker import --change "ENV DEBUG=true" - exampleimagedir

