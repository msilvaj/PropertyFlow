class Property < ApplicationRecord
  belongs_to :condominium, optional: true
  belongs_to :inquilino, optional: true

  validates :identifier, presence: true
  validates :property_type, inclusion: { in: %w(apartment house commercial) }
end
