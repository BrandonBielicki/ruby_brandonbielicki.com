class StaticPagesController < ApplicationController
  def about
  end

  def contact
  end

  def resume
  end

  def cata
  end
  
  def download
    send_file(
      Rails.root.join('app' , 'assets', 'resources', 'BrandonBielickiResume.pdf'),
      filename: "BrandonBielickiResume.pdf",
      type: "application/pdf"
    )
  end
end
