FROM staymarta/service-base-node:v1.0.5

ENV DEBUG node-vault,staymarta*
WORKDIR /users

# Install Dependencies
COPY ./package.json /users
RUN yarn

# Copy files
COPY ./ /users
