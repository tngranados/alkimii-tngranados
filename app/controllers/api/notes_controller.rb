class Api::NotesController < Api::ApiController
  before_action :load_note, except: [:index, :create]
  before_action :authenticate_user!, :redirect_unless_admin_or_self, except: [:index, :create]
  
  def redirect_unless_admin_or_self
    head :unauthorized unless current_user.try(:is_admin?) || (@note && current_user && current_user.id == @note.user.id)
  end

  def index
    @notes = Note.all
  end

  def edit
  end

  def create
    @note = current_user.notes.create(notes_params)

    if @note.save
      render template: '/api/notes/edit'
    else
      render json: {success: false, errors: @note.errors.messages}.to_json, status: 422
    end
  end

  def update
    if @note.update(notes_params)
      render template: '/api/notes/edit'
    else
      render json: {success: false, errors: @note.errors.messages}.to_json, status: 422
    end
  end

  def destroy
    if @note.destroy
      head 200
    else
      render json: {success: false, errors: @note.errors.messages}.to_json, status: 422
    end
  end
  
  private
  
    def notes_params
      params.require(:note).permit(
        :title,
        :message,
      )
    end
  
    def load_note
      @note = Note.find(params[:id])
    end
end
