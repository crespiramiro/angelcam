Angelcam Web Application
This project is a web application developed using the Angelcam Developer Portal, designed to manage and interact with cameras shared with your account. The application includes features like login functionality, camera listing, live streaming, and recorded video playback.

Features
Login Functionality:

Users can log in using a Personal Access Token.
Camera List:

Displays a list of cameras shared with the user's account.
Live Video Streaming:

Users can view live video streams from any selected camera.
Playback of Recorded Videos:

Users can view recorded video segments. Given the gaps in the recordings, these segments are listed individually to simulate recording only during useful events.
Known Issues
Recording Playback:
The application currently retrieves video streams from the Angelcam API. However, there is an issue with retrieving and displaying specific recorded segments. Despite specifying the start and end times for recordings, the API returns a delayed live stream instead of the desired recorded segment.
Setup and Installation

Follow these instructions to set up the project on your local machine.

Prerequisites
Node.js (v14+)
Python 3.x (with Django)
A web browser (for frontend testing)
Git
Installation

Clone the repository:

bash
git clone https://github.com/your-username/angelcam-web-app.git
cd angelcam-web-app
Backend Setup (Django):


Create a virtual environment:
bash
python -m venv env
source env/bin/activate  # For Windows use: env\Scripts\activate
Install the required packages:
bash
pip install -r requirements.txt

Run the Django server:
bash
python manage.py runserver

Frontend Setup (React):

bash
cd frontend

Install the required packages:
bash
npm install

Run the frontend server:
bash
npm run dev

Usage

  Login:

  Open the application in your web browser.
  Enter your Personal Access Token in the login form.
  
List Cameras:

After logging in, the application will display a list of cameras shared with your account.
View Live Stream:

Click on any camera to view its live stream.
View Recorded Segments:

If recordings are available, the recorded segments will be listed. Click on any segment to play it.
API Reference
The application interacts with the Angelcam API for camera management and streaming.

Endpoints Used:
GET /shared-cameras

Retrieves a list of shared cameras.
GET /shared-cameras/{camera_id}/recording/stream

Retrieves a recorded stream for a specific time range.
GET /shared-cameras/{camera_id}/recording/timeline

Retrieves the timeline segments for recorded streams.
Known Issues & Future Improvements
Recording Playback: As mentioned, there is an issue with the playback of recorded segments, where the stream retrieved does not match the specified time range. Future iterations will aim to address this problem and provide a more accurate playback experience
