## Development installation instructions:
1) Install `python3-venv`
2) Install `venv` with `python3 -m venv ~/venv`. `~/venv` will contain the folder that contains your virtual environment, and you will use it to install dependencies. 
3) Run `~/venv/bin/activate` to activate the environment. Run `pip install flask`, and make sure `npm` is installed, and run `npm install` in the root React folder
4) `app.py` contains all the backend logic and routing, run `flask run` in the `backend` folder to run the backend