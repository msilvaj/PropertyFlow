json.extract! inquilino, :id, :nome, :cpf, :rg, :telefone, :codigoEletrobras, :dataInicio, :dataFim, :dataVencimento, :pago, :created_at, :updated_at
json.ap inquilino.ap
json.properties inquilino.properties do |property|
  json.extract! property, :id, :identifier, :property_type, :description
  json.condominium property.condominium, :id, :name, :address if property.condominium
end
json.whatsapp inquilino.whatsapp, :id, :numero, :endereco if inquilino.whatsapp
json.mensalidades inquilino.mensalidades, :id, :mes, :pago
json.url inquilino_url(inquilino, format: :json)
