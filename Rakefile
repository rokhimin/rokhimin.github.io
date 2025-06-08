task :default do
  puts "Available tasks:"
  puts "  rake run - Start the Jekyll server"
end

task :run do
  jekyll_pid = spawn("bundle exec jekyll serve")
  #tailwind_pid = spawn("npx @tailwindcss/cli -i ./assets/css/input.css -o ./assets/css/output.css --watch")

  Process.wait(jekyll_pid)
  #Process.wait(tailwind_pid)
end