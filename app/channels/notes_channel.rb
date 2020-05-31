class NotesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notes"
  end
end
