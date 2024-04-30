FROM nikolaik/python-nodejs:python3.11-nodejs21

# Install nginx
USER root
RUN apt-get -y update && apt-get -y install nginx
#RUN rm /etc/nginx/nginx.conf
# Setup directory structure for Nginx
RUN mkdir -p /var/cache/nginx \
             /var/log/nginx \
             /var/lib/nginx \
             /var/www/html \
             /usr/share/nginx/html
RUN touch /var/run/nginx.pid && touch /var/log/nginx/error.log

# Give permissions to 'pn' user for Nginx and static files directory
RUN chown -R pn:pn /var/cache/nginx \
                   /var/log/nginx \
                   /var/lib/nginx \
                   /var/run/nginx.pid \
                   /var/www/html \
                   /var/log/nginx/error.log \
                   /usr/share/nginx/html

# Switch back to the 'pn' user for installing dependencies and building the app
USER pn
ENV HOME=/home/pn \
    PATH=/home/pn/.local/bin:$PATH

WORKDIR $HOME/app

# Copy the requirements and install Python dependencies
COPY --chown=pn requirements.txt requirements.txt
RUN pip install --no-cache-dir  -r requirements.txt

# Handling frontend setup: Install dependencies and build
COPY --chown=pn frontend frontend
WORKDIR $HOME/app/frontend
RUN npm install
RUN npm run build && cp -r dist/. /usr/share/nginx/html && ls /usr/share/nginx/html



# Switch back to the app directory and setup the backend

WORKDIR $HOME/app

COPY --chown=pn backend backend


COPY --chown=pn nginx.conf /etc/nginx/sites-available/default
#COPY --chown=pn default.conf /etc/nginx/conf.d/default.conf

RUN ls -a
# Prepare the entrypoint script
COPY --chown=pn run.sh run.sh
RUN ls -a 
RUN chmod +x run.sh

# Expose the port 8080
EXPOSE 8080 8000 

CMD ["bash", "run.sh"]