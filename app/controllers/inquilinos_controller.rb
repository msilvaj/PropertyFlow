class InquilinosController < ApplicationController
  before_action :set_inquilino, only: [:show, :edit, :update, :destroy]
  #before_action :calcula_pagamento, only: [:show, :edit, :update, :destroy]


  # GET /inquilinos
  # GET /inquilinos.json
  def index
    calcula_pagamento()
    puts  "ooooooooooooooooooooooo"
    @inquilinos = Inquilino.order(:ap)
  end


  def calcula_pagamento()

    @inquilinos = Inquilino.all
    @inquilinos.each do |x|
      #@indice = (x.mensalidades.sort.find_all{ |x| x.pago.eql? true}.size) - 1
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
        #@pagamento = Pagamento.create(mes: @inquilino.dataVencimento.to_s, pago: @inquilino.pago, inquilino_id: @inquilino.id)
        #@mensalidade = Mensalidade.create(inquilino_id: @inquilino.id, pagamento_id: @pagamento.id)
        #@mensalidade = Mensalidade.create(pago: @inquilino.pago, inquilino_id: @inquilino.id)
        @mesa = @inquilino.dataVencimento
        @cont = 0
        12.times do
          @cont += 1
          @mes =  @mesa + @cont.month
          @mensalidades = Mensalidade.create(inquilino_id: @inquilino.id, mes: @mes, pago: false)
        end
        #
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
    Pagamento.destroy(@inquilino.pagamento_ids)
    @inquilino.pagamentos.destroy_all
    @inquilino.mensalidades.destroy_all
    @inquilino.whatsapp.destroy
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
    params.require(:inquilino).permit(:nome, :cpf, :rg, :telefone, :ap, :codigoEletrobras, :dataInicio, :dataFim, :dataVencimento, :pago, :pagamentos, :mensalidades, :whatsapp)
  end

  def check_cpf(cpf=nil)
    return false if cpf.nil?

    nulos = %w{12345678909 11111111111 22222222222 33333333333 44444444444 55555555555 66666666666 77777777777 88888888888 99999999999 00000000000 12345678909}
    valor = cpf.scan /[0-9]/
    if valor.length == 11
      unless nulos.member?(valor.join)
        valor = valor.collect{|x| x.to_i}
        soma = 10*valor[0]+9*valor[1]+8*valor[2]+7*valor[3]+6*valor[4]+5*valor[5]+4*valor[6]+3*valor[7]+2*valor[8]
        soma = soma - (11 * (soma/11))
        resultado1 = (soma == 0 or soma == 1) ? 0 : 11 - soma
        if resultado1 == valor[9]
          soma = valor[0]*11+valor[1]*10+valor[2]*9+valor[3]*8+valor[4]*7+valor[5]*6+valor[6]*5+valor[7]*4+valor[8]*3+valor[9]*2
          soma = soma - (11 * (soma/11))
          resultado2 = (soma == 0 or soma == 1) ? 0 : 11 - soma
          return true if resultado2 == valor[10] # CPF válido
        end
      end
    end
    return false # CPF inválido
  end

end
