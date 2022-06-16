# Containers

You can see available containers at https://github.cbhq.net/containers

# Inspecting Docker contents locally

Create an image with the current folder's build context by pasting the following command to terminal from root of cds repo.

```sh
yarn debug.docker
```

Once created, run the container via Docker UI and inspect the contents of the /build-context directory which should include everything not excluded by the .dockerignore file. You can then navigate directory structure as you would in CLI normally.

- Open Docker UI
- Click `Images` tab
- Hover over the `cds:latest` row
- Click `Run` button
- Go to `Containers` tab
- Click the terminal icon to open the Docker in your terminal
- type `ls` to print the contents of build context and explore like you would in normal command line
