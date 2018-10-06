json.extract! task, :id, :name, :info, :postion, :created_at, :updated_at
json.url task_url(task, format: :json)
