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
      ActionCable.server.broadcast "notes", note: to_json(@note), type: :new
      render template: '/api/notes/edit'
    else
      render json: {success: false, errors: @note.errors.messages}.to_json, status: 422
    end
  end

  def update
    if @note.update(notes_params)
      ActionCable.server.broadcast "notes", note: to_json(@note), type: :update
      render template: '/api/notes/edit'
    else
      render json: {success: false, errors: @note.errors.messages}.to_json, status: 422
    end
  end

  def destroy
    if @note.destroy
      ActionCable.server.broadcast "notes", note: to_json(@note), type: :destroy
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

    def to_json(note)
      Jbuilder.new do |json|
        ApplicationController.render(
          template: 'api/notes/show.json.jbuilder',
          locals: { note: note, json: json }
        )
      end.attributes!
    end
end
