FROM ruby:2.6.1
RUN apt-get update -qq && apt-get install -y postgresql-client nodejs
WORKDIR /app
COPY Gemfile* ./
RUN bundle install
COPY . .
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]