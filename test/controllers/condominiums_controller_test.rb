require 'test_helper'

class CondominiumsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get condominiums_index_url
    assert_response :success
  end

  test "should get show" do
    get condominiums_show_url
    assert_response :success
  end

  test "should get create" do
    get condominiums_create_url
    assert_response :success
  end

  test "should get update" do
    get condominiums_update_url
    assert_response :success
  end

  test "should get destroy" do
    get condominiums_destroy_url
    assert_response :success
  end

end
