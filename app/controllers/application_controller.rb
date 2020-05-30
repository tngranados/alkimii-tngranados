class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  DeviseController.respond_to :html, :json

  def index
    render template: 'application'
  end
end
