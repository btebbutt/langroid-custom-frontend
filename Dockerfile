FROM nikolaik/python-nodejs:python3.11-nodejs21

# Install nginx
USER root
RUN apt-get -y update && apt-get -y install nginx

# Setup directory structure for Nginx
RUN mkdir -p /var/cache/nginx \
             /var/log/nginx \
             /var/lib/nginx \
             /var/www/html
RUN touch /var/run/nginx.pid

# Give permissions to 'pn' user for Nginx and static files directory
RUN chown -R pn:pn /var/cache/nginx \
                   /var/log/nginx \
                   /var/lib/nginx \
                   /var/run/nginx.pid \
                   /var/www/html

# Switch back to the 'pn' user for installing dependencies and building the app
USER pn
ENV HOME=/home/pn \
    PATH=/home/pn/.local/bin:$PATH

WORKDIR $HOME/app

# Copy the requirements and install Python dependencies
COPY --chown=pn requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Handling frontend setup: Install dependencies and build
COPY --chown=pn ./frontend ./frontend
WORKDIR $HOME/app/frontend
RUN npm install
RUN npm run build


# Switch back to app directory
USER pn
WORKDIR $HOME/app

# Ensure the rest of the application is copied
COPY --chown=pn . .

# Configure Nginx to use the custom configuration
COPY --chown=pn nginx.conf /etc/nginx/nginx.conf

# Prepare the entrypoint script
COPY --chown=pn run.sh run.sh
RUN chmod +x run.sh

CMD ["bash", "run.sh"]
