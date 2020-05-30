Rails.application.routes.draw do

  devise_for :users, only: [:sessions]

  namespace :api, :defaults => { :format => 'json' } do
    as :user do
      delete 'sign_out', to: '/devise/sessions#destroy'
    end
    resources :users, except: :show
  end

  root :to => "application#index"
  match "*path", to: "application#index", format: false, via: :get

end
