class InquilinosController < ApplicationController
  before_action :set_inquilino, only: [:show, :edit, :update, :destroy]
  #before_action :calcula_pagamento, only: [:show, :edit, :update, :destroy]


  # GET /inquilinos
  # GET /inquilinos.json
  def index
    calcula_pagamento()
    @inquilinos = Inquilino.includes(:properties, :whatsapp, :mensalidades).all
  end


  def calcula_pagamento()
    @inquilinos = Inquilino.all
    @inquilinos.each do |x|
      @me = x.mensalidades.find{ |y| y.mes.month.eql? Date.today.month}
      if (!@me.eql? nil)
        if(@me.pago.eql? false)
          x.pago = false
          x.save!
        end
        if (@me.pago.eql? true)
          x.pago = true
          x.save!
        end
      end
    end
  end

  # GET /inquilinos/1
  # GET /inquilinos/1.json
  def show
    @inquilino = Inquilino.find(params[:id])
    respond_to do |format|
      format.html
      format.json
    end
  end

  # GET /inquilinos/new
  def new
    @inquilino = Inquilino.new
  end

  # GET /inquilinos/1/edit
  def edit
  end

  # POST /inquilinos
  # POST /inquilinos.json
  def create
    @inquilino = Inquilino.new(inquilino_params)
    respond_to do |format|
      if @inquilino.save
        @mesa = @inquilino.dataVencimento
        @cont = 0
        12.times do
          @cont += 1
          @mes =  @mesa + @cont.month
          @mensalidades = Mensalidade.create(inquilino_id: @inquilino.id, mes: @mes, pago: false)
        end
        @whatsapp = Whatsapp.create(inquilino_id: @inquilino.id, numero: " ", endereco: " ")

        format.html {redirect_to @inquilino, notice: 'Inquilino criado com sucesso!.'}
        format.json {render :show, status: :created, location: @inquilino}
      else
        format.html {render :new}
        format.json {render json: @inquilino.errors, status: :unprocessable_entity}
      end
    end
  end

  # PATCH/PUT /inquilinos/1
  # PATCH/PUT /inquilinos/1.json
  def update
    respond_to do |format|
      if @inquilino.update(inquilino_params)
        format.html {redirect_to @inquilino, notice: 'Inquilino atualizado com sucesso!.'}
        format.json {render :show, status: :ok, location: @inquilino}
      else
        format.html {render :edit}
        format.json {render json: @inquilino.errors, status: :unprocessable_entity}
      end
    end
  end

  # DELETE /inquilinos/1
  # DELETE /inquilinos/1.json
  def destroy
    @inquilino.pagamentos.destroy_all
    @inquilino.mensalidades.destroy_all
    @inquilino.whatsapp&.destroy
    @inquilino.properties.update_all(inquilino_id: nil)
    @inquilino.destroy
    respond_to do |format|
      format.html {redirect_to inquilinos_url, notice: 'Inquilino excluido com sucesso.'}
      format.json {head :no_content}
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_inquilino
    @inquilino = Inquilino.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def inquilino_params
    params.require(:inquilino).permit(:nome, :cpf, :rg, :telefone, :codigoEletrobras, :dataInicio, :dataFim, :dataVencimento, :pago, :pagamentos, :mensalidades, :whatsapp, property_ids: [])
  end
end
