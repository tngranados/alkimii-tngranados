class Api::UsersController < Api::ApiController
  before_action :load_user, except: [:index, :auth, :create]
  before_action :authenticate_user!, :redirect_unless_admin_or_self, except: [:index, :auth]
  
  def redirect_unless_admin_or_self
    head :unauthorized unless current_user.try(:is_admin?) || (@user && current_user && current_user.email == @user.email)
  end

  def index
    @users = User.all
  end

  def auth
    :authenticate_user! 
    if user_signed_in?
      @user = current_user
      render template: '/api/users/edit'
    else
      head :unauthorized
    end
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
    # Check if non admin user tries to add herself admin rights
    if !current_user.try(:is_admin?) && user_params[:is_admin]
      render json: {success: false, errors: {"is_admin":["cannot give admin rights to yourself"]}}.to_json, status: 422
    else
      if @user.update(user_params)
        render template: '/api/users/edit'
      else
        render json: {success: false, errors: @user.errors.messages}.to_json, status: 422
      end
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
