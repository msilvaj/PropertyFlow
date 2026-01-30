class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, if: -> { request.format.json? }
  before_action :set_locale
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  def set_locale
    session[:locale] = params[:locale] if params[:locale].present?
    I18n.locale = session[:locale] || I18n.default_locale
  end


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end
end
