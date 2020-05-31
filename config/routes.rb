Rails.application.routes.draw do
  devise_for :users, path: 'api'

  namespace :api, :defaults => { :format => 'json' } do
    resources :users, except: :show
    resources :notes, except: :show
  end

  root :to => "application#index"
  match "*path", to: "application#index", format: false, via: :get

end
