class WhatsappsController < ApplicationController
  before_action :set_whatsapp, only: [:show, :edit, :update, :destroy]

  # GET /whatsapps
  # GET /whatsapps.json
  def index
    @whatsapps = Whatsapp.all
  end

  # GET /whatsapps/1
  # GET /whatsapps/1.json
  def show
  end

  # GET /whatsapps/new
  def new
    @whatsapp = Whatsapp.new
  end

  # GET /whatsapps/1/edit
  def edit
  end

  # POST /whatsapps
  # POST /whatsapps.json
  def create
    @whatsapp = Whatsapp.new(whatsapp_params)

    respond_to do |format|
      if @whatsapp.save
        format.html { redirect_to @whatsapp, notice: 'Whatsapp criado com sucesso.' }
        format.json { render :show, status: :created, location: @whatsapp }
      else
        format.html { render :new }
        format.json { render json: @whatsapp.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /whatsapps/1
  # PATCH/PUT /whatsapps/1.json
  def update
    respond_to do |format|
      if @whatsapp.update(whatsapp_params)
        format.html { redirect_to @whatsapp, notice: 'Whatsapp atualizado com sucesso.' }
        format.json { render :show, status: :ok, location: @whatsapp }
      else
        format.html { render :edit }
        format.json { render json: @whatsapp.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /whatsapps/1
  # DELETE /whatsapps/1.json
  def destroy
    @whatsapp.destroy
    respond_to do |format|
      format.html { redirect_to whatsapps_url, notice: 'Whatsapp apagado com sucesso.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_whatsapp
      @whatsapp = Whatsapp.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def whatsapp_params
      params.require(:whatsapp).permit(:inquilino_id, :numero, :endereco)
    end
end
