json.extract! inquilino, :id, :nome, :cpf, :rg, :telefone, :ap, :codigoEletrobras, :dataInicio, :dataFim, :dataVencimento, :pago, :created_at, :updated_at
json.whatsapp inquilino.whatsapp, :id, :numero, :endereco if inquilino.whatsapp
json.mensalidades inquilino.mensalidades, :id, :mes, :pago
json.url inquilino_url(inquilino, format: :json)
