-- Sample seed data for K + T
-- Run after schema.sql

insert into activities (title, notes, location, estimated_cost, tag, category, completed, favorite) values
  ('Sunrise at Mount Tam', 'Pack coffee and a blanket', 'Mill Valley, CA', '$0', 'outdoors', 'north_cali', false, true),
  ('Tartine Manufactory brunch', 'Get the morning bun', 'San Francisco, CA', '$40', 'food', 'north_cali', true, false),
  ('Big Sur coastal drive', 'Stop at Bixby Bridge', 'Highway 1', '$60 gas', 'travel', 'north_cali', false, true),
  ('Napa wine tasting day', 'Book a driver or stay overnight', 'Napa Valley, CA', '$150', 'date_night', 'north_cali', false, false),
  ('Muir Woods hike', 'Reserve parking in advance', 'Muir Woods, CA', '$15', 'outdoors', 'north_cali', false, false),

  ('Griffith Observatory at dusk', 'City lights view', 'Los Angeles, CA', '$0', 'date_night', 'south_cali', false, true),
  ('Joshua Tree camping weekend', 'Bring warm layers at night', 'Joshua Tree, CA', '$120', 'adventure', 'south_cali', false, true),
  ('Santa Monica pier sunset', 'Ride the ferris wheel', 'Santa Monica, CA', '$30', 'outdoors', 'south_cali', false, false),
  ('Grand Central Market food crawl', 'Try Eggslut and Sarita''s', 'Downtown LA', '$50', 'food', 'south_cali', true, false),
  ('Malibu beach day', 'Rent boards if we want to surf', 'Malibu, CA', '$40', 'outdoors', 'south_cali', false, false),

  ('Cook a new recipe together', 'Pick something from a cookbook we haven''t tried', 'Home', '$25', 'food', 'either', false, false),
  ('Museum date', 'Check rotating exhibits', 'Any city', '$40', 'creative', 'either', false, false),
  ('Stargazing picnic', 'Download a constellation app', 'Anywhere dark', '$15', 'date_night', 'either', false, true),
  ('Learn a dance together', 'Salsa or swing — beginner class', 'Local studio', '$60', 'creative', 'either', false, false),
  ('Board game café night', 'Try something cooperative', 'Local café', '$30', 'coffee', 'either', true, false);

-- Mark completed items with completed_at
update activities set completed_at = now() - interval '3 days' where title = 'Tartine Manufactory brunch';
update activities set completed_at = now() - interval '1 week' where title = 'Grand Central Market food crawl';
update activities set completed_at = now() - interval '2 days' where title = 'Board game café night';
