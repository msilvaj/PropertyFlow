Rails.application.routes.draw do
  resources :condominiums
  resources :properties
  resources :whatsapps
  resources :mensalidades
  devise_for :users
  resources :users
  resources :pagamentos
  resources :inquilinos

  get 'paginas/inicio'
  get 'paginas/ajuda'

  root 'inquilinos#index'
end
