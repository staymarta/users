FROM staymarta/service-base-node:v1.0.3

ENV DEBUG node-vault,staymarta*
WORKDIR /users

# Install Dependencies
COPY ./package.json /gateway
RUN yarn

# Copy files
COPY ./ /users
