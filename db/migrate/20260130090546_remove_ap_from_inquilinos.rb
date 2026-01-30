class RemoveApFromInquilinos < ActiveRecord::Migration[5.2]
  def change
    remove_column :inquilinos, :ap, :string
  end
end
