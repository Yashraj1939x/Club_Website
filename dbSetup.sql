-- NOTE: THIS FILE IS ONLY TO BE USED ONCE WHEN SETUPING THE DATABASE, DON'T RUN THIS FILE AGAIN!!!

DROP TABLE IF EXISTS timeline_events, achievements, projects, events, team_members, alumni, gallery_items, logos;

-- For timelineEvents
CREATE TABLE timeline_events (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  display_order SMALLINT -- Use this to order events
);

-- For achievements
CREATE TABLE achievements (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- 'users', 'target', etc.
  link TEXT,
  display_order SMALLINT
);

-- For projectsData
CREATE TABLE projects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT,
  images JSONB, -- Stores an array of image URLs, e.g., ["/path/1.jpg", "/path/2.jpg"]
  category TEXT,
  year TEXT,
  technologies JSONB, -- e.g., ["Python", "TensorFlow"]
  status TEXT,
  team_members JSONB, -- e.g., ["Priya Patel", "Arjun Sharma"]
  github_link TEXT,
  live_link TEXT,
  display_order SMALLINT
);

-- For eventsData (both upcoming and past)
CREATE TABLE events (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT,
  images JSONB,
  category TEXT,
  date TIMESTAMPTZ NOT NULL,
  time TEXT,
  location TEXT,
  registered INT,
  capacity INT,
  highlights JSONB
);

-- For teamData
CREATE TABLE team_members (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  role TEXT,
  image TEXT, -- URL to profile image
  department TEXT,
  bio TEXT,
  expertise JSONB,
  publications INT,
  projects INT,
  link TEXT,
  display_order SMALLINT
);

-- For alumni
CREATE TABLE alumni (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  year INT,
  current_position TEXT,
  link TEXT,
  image TEXT,
  quote TEXT,
  display_order SMALLINT
);

-- For galleryData
CREATE TABLE gallery_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT,
  images JSONB,
  display_order SMALLINT
);

CREATE TABLE logos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT
);

-- Populating: timeline_events
INSERT INTO timeline_events (year, title, description, display_order) VALUES
('2020', 'IUCEE RIT Chapter Founded', 'Established with a vision to transform engineering education.', 1),
('2021', 'First IASF Participation', 'Students participated in the Indian Annual Student Forum.', 2),
('2022', 'UN SDG Initiative Launch', 'Started focusing projects on Sustainable Development Goals.', 3),
('2023', 'National Recognition', 'Received recognition for innovative engineering solutions.', 4),
('2024', 'IASF at KLE Tech University', 'Successful participation at Hubli, Karnataka.', 5),
('2025', 'IASF at VNR VJIET', 'Latest achievement at Hyderabad, Telangana.', 6);

-- Populating: achievements
INSERT INTO achievements (title, description, icon, link, display_order) VALUES
('50+ Students Impacted', 'Directly mentored and guided engineering students.', 'users', '#alumni', 1),
('15+ Projects Completed', 'Real-world solutions addressing societal challenges.', 'target', '#projects', 2),
('3 National Conferences', 'Active participation in IASF events across India.', 'award', '#gallery', 3),
('UN SDG Focus', 'All projects are aligned with one or more of the 17 SDGs.', 'globe', '#sdg', 4);

-- Populating: projects
INSERT INTO projects (title, description, images, category, year, technologies, status, team_members, github_link, live_link, display_order) VALUES
(
  'Ceramic Water Filtration', 
  'A comprehensive project focused on developing a low-cost, effective ceramic water filter using locally sourced materials. The primary goal is to provide a sustainable solution for clean drinking water in rural communities, aligning with UN SDG 6.', 
  '["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/projects/1.png", "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/projects/1.png"]',
  'Sustainability', 
  '2024', 
  '["Material Science", "Fluid Dynamics", "Ceramic Engineering", "Water Quality Testing"]', 
  'Active', 
  '["Priya Patel", "Arjun Sharma"]',
  'https://github.com/iucee-rit/water-filter',
  NULL,
  1
),
(
  'AI-Powered Crop Disease Detection', 
  'This project utilizes computer vision and machine learning to identify crop diseases from leaf images. Farmers can upload a photo, and the AI model diagnoses potential diseases, suggesting mitigation strategies. This aims to improve crop yield and support sustainable agriculture (UN SDG 2: Zero Hunger).', 
  '["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/projects/cropDisease/images.png", "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/projects/cropDisease/images.png"]',
  'AI/ML', 
  '2023', 
  '["Python", "TensorFlow", "React Native", "Computer Vision"]', 
  'Completed', 
  '["Rohan Verma", "Anita Desai"]',
  'https://github.com/iucee-rit/crop-disease-ai',
  'https://crop-ai.example.com',
  2
);

-- Populating: events
-- Note: Both upcoming and past events go into the same table. The app logic separates them.
INSERT INTO events (title, description, images, category, date, time, location, registered, capacity, highlights) VALUES
(
  'Get Minds Together: IASF_2026',
  'Join us for an discussion on how to manage logistics of a big group',
  '["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/upcommingEvents/IASF_2026/1.png"]',
  'Webinar',
  '2025-10-15T19:00:00',
  '7:00 PM IST',
  'Online',
  45,
  100,
  NULL
),
(
  'Electric Vehicles Workshop',
  'A hands-on workshop covering the fundamentals of electric vehicle systems, battery technology, and motor design. Participants got to assemble a small-scale EV model.',
  '["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/pastEvents/ev/1.jpg"]',
  'Workshop',
  '2025-08-20',
  NULL,
  'RIT Campus, Club Room',
  NULL,
  NULL,
  '["Information on EV", "EV system design", "Market details"]'
),
(
  'Figma for Engineers',
  'An introductory workshop on UI/UX design using Figma, tailored for engineering students to help them prototype their project ideas effectively.',
  '["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/pastEvents/figma/1.jpg"]',
  'Workshop',
  '2025-07-10',
  NULL,
  'RIT Campus, Design Lab',
  NULL,
  NULL,
  '["Figma Basics", "Prototyping", "Profile Card Design"]'
);

-- Populating: team_members
INSERT INTO team_members (name, role, image, department, bio, expertise, publications, projects, link, display_order) VALUES
('Dr. Krishna Vedula', 'Director of IUCEE Student Chapter', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/krishna.png', 'Executive Director, IUCEE', 'Leading the vision for innovative engineering education across India.', '["Engineering Education", "Global Collaboration"]', 20, 50, 'https://www.linkedin.com/in/krishna-vedula/', 1),
('Mr. Mayur Maske', 'Faculty Coordinator', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/maske.png', 'Mechanical Engineering', 'Guiding students towards academic and professional excellence.', '["Mechanical Design", "Student Mentorship"]', 5, 10, 'https://www.linkedin.com/in/mayur-maske/', 2),
('Arjun Sharma', 'President', 'https://<your-project-ref>.supabase.co/storage/v1/object/public/media/profiles/placeholder.png', 'Computer Engineering - Final Year', 'Overseeing all chapter activities and strategic direction.', '["Leadership", "Project Management", "Web Dev"]', NULL, NULL, 'https://www.linkedin.com/in/arjun-sharma/', 3),
('Priya Patel', 'Vice President', 'https://<your-project-ref>.supabase.co/storage/v1/object/public/media/profiles/placeholder.png', 'Electronics Engineering - Third Year', 'Assisting in chapter management and external relations.', '["Embedded Systems", "Public Speaking"]', NULL, NULL, 'https://www.linkedin.com/in/priya-patel/', 4);

-- Populating: alumni
INSERT INTO alumni (name, year, current_position, link, image, quote, display_order) VALUES
('Pawan Kamble', 2022, 'Student at University of Sydney', 'https://www.linkedin.com/in/pawan-kamble-b00688229/', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni1.jpg', 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.', 1),
('Shubham Katekar', 2022, 'Co-founder at Techsyne Consulting', 'https://www.linkedin.com/in/shubham-katekar-8b9487190/', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni2.jpg', 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.', 2),
('Sejal Patil', 2022, 'Director at Pullpubb', 'https://www.linkedin.com/in/sejal-patil-2023b1191/', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni3.jpg', 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.', 3),
('Tanmay Bhosle', 2022, 'Part Planning Engineer @ MAN Truck & Bus', 'https://www.linkedin.com/in/tanmay-bhosle-a63445191/', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni4.jpg', 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.', 4),
('Kunal Ashtekar', 2022, 'Programmer Analyst @ Cognizant', 'https://www.linkedin.com/in/kunal-ashtekar-91599818b/', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni5.png', 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.', 5),
('Harsh Patil', 2022, 'Data Analyst @ Client Solutions', 'https://www.linkedin.com/in/harsh-patil-34b82b1a8/', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/profiles/alumni6.png', 'IUCEE-RIT was where I first applied engineering concepts to real-world problems. It was foundational for my career.', 6);

-- Populating: gallery_items
INSERT INTO gallery_items (title, description, images, display_order) VALUES
(
  'IASF 2025 - Hyderabad',
  'VNR Vignana Jyothi Institute of Engineering & Technology',
  '[
  "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/1.jpg", "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/2.jpg", 
  "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/3.jpg", "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/4.jpg",
  "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hyderabad/5.jpg"
  ]',
  1
),
(
  'IASF 2024 - Hubli',
  'KLE Technological University, Hubli, Karnataka',
  '[
  "https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-hubli/1.jpg"
  ]',
  2
),
(
  'IASF 1 - Mysore',
  'Vidyavardhaka College of Engineering, Mysore, Karnataka',
  '["https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/trips/iasf-mysore/1.jpg"]',
  3
);

INSERT INTO logos (name, logo_url, website_url) VALUES
('Cognizant', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/logos/Cognizant.svg', 'https://www.cognizant.com/'),
('KLE Tech University', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/logos/KLE.png', 'https://www.kletech.ac.in/'),
('VNR VJIET', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/logos/VJIET.png', 'https://www.vnrvjiet.ac.in/'),
('Dassault Systèmes', 'https://xxacscywrssxpiyhnoxi.supabase.co/storage/v1/object/public/media/logos/3DS_corporate-logo_blue.svg', 'https://www.3ds.com/'),