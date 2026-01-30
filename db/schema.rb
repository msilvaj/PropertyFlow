# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2026_01_30_090546) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "condominia", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "inquilinos", force: :cascade do |t|
    t.string "nome"
    t.string "cpf"
    t.string "rg"
    t.string "telefone"
    t.string "codigoEletrobras"
    t.date "dataInicio"
    t.date "dataFim"
    t.date "dataVencimento"
    t.boolean "pago"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mensalidades", force: :cascade do |t|
    t.bigint "inquilino_id"
    t.date "mes"
    t.boolean "pago"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["inquilino_id"], name: "index_mensalidades_on_inquilino_id"
  end

  create_table "pagamentos", force: :cascade do |t|
    t.string "mes"
    t.boolean "pago"
    t.bigint "inquilino_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["inquilino_id"], name: "index_pagamentos_on_inquilino_id"
  end

  create_table "properties", force: :cascade do |t|
    t.string "identifier"
    t.string "property_type"
    t.text "description"
    t.bigint "condominium_id"
    t.bigint "inquilino_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["condominium_id"], name: "index_properties_on_condominium_id"
    t.index ["inquilino_id"], name: "index_properties_on_inquilino_id"
  end

  create_table "users", force: :cascade do |t|
    t.boolean "admin"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "whatsapps", force: :cascade do |t|
    t.bigint "inquilino_id"
    t.string "numero"
    t.string "endereco"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["inquilino_id"], name: "index_whatsapps_on_inquilino_id"
  end

  add_foreign_key "mensalidades", "inquilinos"
  add_foreign_key "pagamentos", "inquilinos"
  add_foreign_key "properties", "condominia"
  add_foreign_key "properties", "inquilinos"
  add_foreign_key "whatsapps", "inquilinos"
end
