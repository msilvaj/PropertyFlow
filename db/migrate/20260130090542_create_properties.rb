class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|
      t.string :identifier
      t.string :property_type
      t.text :description
      t.references :condominium, foreign_key: true
      t.references :inquilino, foreign_key: true

      t.timestamps
    end
  end
end
