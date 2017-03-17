FROM staymarta/service-base-node:v1.0.2

ENV DEBUG node-vault,staymarta*
WORKDIR "/users"

# Add nodemon
RUN yarn global add nodemon

# Install Dependencies
ADD ./package.json /gateway
RUN yarn

# Copy files
ADD ./ /users
