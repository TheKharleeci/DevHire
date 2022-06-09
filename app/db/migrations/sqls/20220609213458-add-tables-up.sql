/* Replace with your SQL commands */
CREATE TYPE "user_type" AS ENUM ('recruiter', 'job_seeker');

CREATE TYPE "status" AS ENUM (
  'pending',
  'in_consideration',
  'completed'
  'failed'
);

CREATE TABLE IF NOT EXISTS "user_info" (
  "id" varchar PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "phone_number" varchar,
  "is_verified" boolean NOT NULL,
  "type" user_type NOT NULL,
  "email_verification_token" varchar,
  "email_verification_token_exp" timestamptz,
  "preferences" varchar,
  "image_url" varchar,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "company" (
  "id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "about_us" varchar NOT NULL,
  "address" varchar,
  "type" varchar NOT NULL,
  "recruiter_id" varchar REFERENCES user_info(id) NOT NULL,
  "city" varchar NOT NULL,
  "state" varchar NOT NULL,
  "country" varchar NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "job_opening" (
  "id" varchar PRIMARY KEY,
  "company_id" varchar REFERENCES company(id),
  "requirements" varchar NOT NULL,
  "description" varchar NOT NULL,
  "created_by" varchar REFERENCES user_info(id) NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ DEFAULT now()
);


CREATE TABLE IF NOT EXISTS "application" (
  "id" varchar PRIMARY KEY,
  "job_id" varchar REFERENCES job_opening(id) NOT NULL,
  "applicant_id" varchar REFERENCES user_info(id) NOT NULL,
  "application_status" status,
  "resume" varchar NOT NULL,
  "cover_letter" varchar,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ DEFAULT now()
);
