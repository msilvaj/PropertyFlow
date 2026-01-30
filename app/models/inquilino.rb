class Inquilino < ApplicationRecord
  has_many :pagamentos
  has_many :mensalidades
  has_many :properties
  has_one :whatsapp
  validates :nome, presence: true

  def ap
    properties.map(&:identifier).join(", ")
  end
end
