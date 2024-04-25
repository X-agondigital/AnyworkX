#Create a virtual environment
pip install virtualenv my_env_name>

#install the requirements file
#cd anyworkx_backend
pip install -r requirements.txt

#make migration database
python manage.py makemigrations

#migrate 
python manage.py migrate 
#run server 
python3 manage.py runserver 