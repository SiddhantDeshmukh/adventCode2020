# Advent of Code: Day 1
# =====================
#
# Find the two entries that sum to 2020 and then multiply those two numbers together.
# For example, suppose your expense report contained the following:
#
# 1721
# 979
# 366
# 299
# 675
# 1456
#
# In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together
# produces 1721 * 299 = 514579, so the correct answer is 514579. Of course, your expense
# report is much larger. Find the two entries that sum to 2020; what do you get if you multiply
# them together?

class EntryScanner
  PATH_TO_DATASET_FILE = './day1_dataset.txt'

  def execute(target_sum:)
    result = nil
    while result.nil? && !(entry = entries.shift).nil?
      next unless entries.count > 0
      result = entries.find { |other_entry| other_entry + entry == target_sum }
    end

    puts "#{entry} + #{result} = #{target_sum}"
    puts "#{entry} x #{result} = #{entry * result}"
  end

  private

  def entries
    @entries ||= read_dataset.each_line.map { |line| line.to_i }
  end

  def read_dataset
    File.open(PATH_TO_DATASET_FILE).read
  end
end

EntryScanner.new.execute(target_sum: 2020)
