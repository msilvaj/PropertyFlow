# Cleanup existing data
puts "Cleaning up database..."
Pagamento.destroy_all
Mensalidade.destroy_all
Whatsapp.destroy_all
Property.destroy_all
Condominium.destroy_all
Inquilino.destroy_all
User.destroy_all

# 1. Create Admin User
puts "Creating admin user..."
User.create!(
  name: 'Miqueias Silva',
  email: 'miqueias@miqueias.com.br',
  password: 'password123',
  password_confirmation: 'password123',
  admin: true
)

# 2. Create Condominiums
puts "Creating condominiums..."
ed_paraiba = Condominium.create!(name: 'Edifício Paraíba', address: 'Rua das Flores, 123')
village_solar = Condominium.create!(name: 'Village Solar', address: 'Av. Brasil, 456')

# 3. Create Tenants and Assign Properties
puts "Creating tenants and properties..."
tenants_data = [
  { 
    nome: 'João Pertile', 
    telefone: '5511999999999', 
    properties: [
      { identifier: '101', type: 'apartment', condo: ed_paraiba },
      { identifier: '103', type: 'apartment', condo: ed_paraiba }
    ]
  },
  { 
    nome: 'Maria Souza', 
    telefone: '5511888888888', 
    properties: [
      { identifier: '102', type: 'apartment', condo: ed_paraiba }
    ]
  },
  { 
    nome: 'Carlos Edu', 
    telefone: '5511777777777', 
    properties: [
      { identifier: '201', type: 'apartment', condo: village_solar }
    ]
  },
  { 
    nome: 'Ana Costa', 
    telefone: '5511666666666', 
    properties: [
      { identifier: 'Casa de Praia', type: 'house', condo: nil }
    ]
  }
]

tenants_data.each do |data|
  tenant = Inquilino.create!(
    nome: data[:nome],
    telefone: data[:telefone],
    cpf: "123.456.789-#{rand(10..99)}",
    rg: "#{rand(10000..99999)}",
    dataInicio: Date.today - 6.months,
    dataVencimento: Date.today.beginning_of_month + rand(1..15).days,
    pago: true
  )

  data[:properties].each do |p_data|
    Property.create!(
      identifier: p_data[:identifier],
      property_type: p_data[:type],
      condominium: p_data[:condo],
      inquilino: tenant
    )
  end

  # WhatsApp info (use first property as address)
  main_prop = data[:properties].first
  Whatsapp.create!(
    inquilino: tenant,
    numero: tenant.telefone,
    endereco: "#{main_prop[:condo]&.name || 'Standalone'} - #{main_prop[:identifier]}"
  )

  # Create Installments
  (-6..6).each do |i|
    month_date = Date.today.beginning_of_month + i.months
    is_paid = i < 0 ? (rand < 0.9) : (i == 0 ? (rand < 0.5) : false)
    
    Mensalidade.create!(inquilino: tenant, mes: month_date, pago: is_paid)
    Pagamento.create!(inquilino: tenant, mes: month_date.to_s, pago: is_paid)
  end
  
  # Sync payment status
  current_month_paid = tenant.mensalidades.find { |m| m.mes.year == Date.today.year && m.mes.month == Date.today.month }&.pago
  tenant.update!(pago: !!current_month_paid)
end

# Create some vacant properties
puts "Creating vacant properties..."
Property.create!(identifier: '104', property_type: 'apartment', condominium: ed_paraiba)
Property.create!(identifier: '202', property_type: 'apartment', condominium: village_solar)

puts "Database seeded successfully!"
puts "Created #{User.count} Users"
puts "Created #{Inquilino.count} Inquilinos"
puts "Created #{Property.count} Properties"
puts "Created #{Condominium.count} Condominiums"
