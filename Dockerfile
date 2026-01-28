FROM ruby:2.6.1

# Fix Debian Stretch EOL repository issues by using archive.debian.org
RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list && \
    echo "deb http://archive.debian.org/debian-security stretch/updates main" >> /etc/apt/sources.list && \
    echo "Acquire::Check-Valid-Until false;" > /etc/apt/apt.conf.d/99no-check-valid-until

# Install dependencies
RUN apt-get update -qq && apt-get install -y --allow-unauthenticated postgresql-client nodejs

WORKDIR /app

# Install Bundler 2.x (required by Gemfile.lock)
RUN gem install bundler:2.1.4

COPY Gemfile* ./
RUN bundle install
COPY . .
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]