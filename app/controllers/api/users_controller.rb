class Api::UsersController < Api::ApiController
  # skip_before_action :verify_authenticity_token
  before_action :load_user, except: [:index, :create]

  def index
    @users = User.all
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      render template: '/api/users/edit'
    else
      render json: {success: false, errors: @user.errors.messages}.to_json, status: 422
    end
  end

  def update
    if @user.update(user_params)
      render template: '/api/users/edit'
    else
      render json: {success: false, errors: @user.errors.messages}.to_json, status: 422
    end
  end

  def destroy
    if @user.destroy
      head 200
    else
      render json: {success: false, errors: @user.errors.messages}.to_json, status: 422
    end
  end
  
  private
  
    def user_params
      params.require(:user).permit(
        :email,
        :password,
        :password_confirmation,
        :is_admin
      )
    end
  
    def load_user
      @user = User.find(params[:id])
    end
end
