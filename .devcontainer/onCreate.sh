yarn global add chokidar-cli \
&& yarn global add @completium/completium-cli \
&& yarn install \
&& echo 'export PATH="$(yarn global bin):$PATH"' >> ~/.bashrc