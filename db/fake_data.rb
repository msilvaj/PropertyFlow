# Cleanup existing data
puts "Cleaning up database..."
Pagamento.destroy_all
Mensalidade.destroy_all
Whatsapp.destroy_all
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

# 2. Create Tenants (Inquilinos) with varying statuses
puts "Creating tenants..."
tenants_data = [
  { nome: 'João Pertile', ap: '101', telefone: '5511999999999', dataVencimento: Date.today.beginning_of_month },
  { nome: 'Maria Souza', ap: '102', telefone: '5511888888888', dataVencimento: Date.today.beginning_of_month + 5.days },
  { nome: 'Carlos Edu', ap: '201', telefone: '5511777777777', dataVencimento: Date.today.beginning_of_month + 10.days },
  { nome: 'Ana Costa', ap: '202', telefone: '5511666666666', dataVencimento: Date.today.beginning_of_month + 15.days }
]

tenants_data.each do |data|
  tenant = Inquilino.create!(
    nome: data[:nome],
    ap: data[:ap],
    telefone: data[:telefone],
    cpf: "123.456.789-#{rand(10..99)}",
    rg: "#{rand(10000..99999)}",
    dataInicio: Date.today - 6.months,
    dataVencimento: data[:dataVencimento],
    pago: true
  )

  # 3. Create WhatsApp info
  Whatsapp.create!(
    inquilino: tenant,
    numero: tenant.telefone,
    endereco: "Rua Exemplo, #{tenant.ap}"
  )

  # 4. Create Monthly Installments (Mensalidades)
  puts "Creating installments for #{tenant.nome}..."
  (-6..6).each do |i|
    month_date = Date.today.beginning_of_month + i.months
    
    is_paid = true
    if i < 0
      is_paid = rand < 0.9 # High chance of past months being paid
    elsif i == 0
      is_paid = rand < 0.5 # 50% chance for current month
    else
      is_paid = false # Future months are unpaid
    end

    Mensalidade.create!(
      inquilino: tenant,
      mes: month_date,
      pago: is_paid
    )
    
    Pagamento.create!(
      inquilino: tenant,
      mes: month_date.to_s,
      pago: is_paid
    )
  end
  
  # Update tenant 'pago' status based on current month
  current_month_paid = tenant.mensalidades.find { |m| m.mes.year == Date.today.year && m.mes.month == Date.today.month }&.pago
  tenant.update!(pago: !!current_month_paid)
end

puts "Database seeded successfully with custom fake data!"
puts "Created #{User.count} Users"
puts "Created #{Inquilino.count} Inquilinos"
puts "Created #{Mensalidade.count} Mensalidades"
